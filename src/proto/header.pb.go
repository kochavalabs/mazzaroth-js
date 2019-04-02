// Code generated by protoc-gen-go. DO NOT EDIT.
// source: header.proto

package pb

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type BlockHeader struct {
	Timestamp            string   `protobuf:"bytes,1,opt,name=timestamp,proto3" json:"timestamp,omitempty"`
	BlockHeight          uint64   `protobuf:"varint,2,opt,name=block_height,json=blockHeight,proto3" json:"block_height,omitempty"`
	MerkleRoot           string   `protobuf:"bytes,3,opt,name=merkle_root,json=merkleRoot,proto3" json:"merkle_root,omitempty"`
	PreviousHeader       string   `protobuf:"bytes,4,opt,name=previous_header,json=previousHeader,proto3" json:"previous_header,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *BlockHeader) Reset()         { *m = BlockHeader{} }
func (m *BlockHeader) String() string { return proto.CompactTextString(m) }
func (*BlockHeader) ProtoMessage()    {}
func (*BlockHeader) Descriptor() ([]byte, []int) {
	return fileDescriptor_6398613e36d6c2ce, []int{0}
}

func (m *BlockHeader) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BlockHeader.Unmarshal(m, b)
}
func (m *BlockHeader) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BlockHeader.Marshal(b, m, deterministic)
}
func (m *BlockHeader) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BlockHeader.Merge(m, src)
}
func (m *BlockHeader) XXX_Size() int {
	return xxx_messageInfo_BlockHeader.Size(m)
}
func (m *BlockHeader) XXX_DiscardUnknown() {
	xxx_messageInfo_BlockHeader.DiscardUnknown(m)
}

var xxx_messageInfo_BlockHeader proto.InternalMessageInfo

func (m *BlockHeader) GetTimestamp() string {
	if m != nil {
		return m.Timestamp
	}
	return ""
}

func (m *BlockHeader) GetBlockHeight() uint64 {
	if m != nil {
		return m.BlockHeight
	}
	return 0
}

func (m *BlockHeader) GetMerkleRoot() string {
	if m != nil {
		return m.MerkleRoot
	}
	return ""
}

func (m *BlockHeader) GetPreviousHeader() string {
	if m != nil {
		return m.PreviousHeader
	}
	return ""
}

func init() {
	proto.RegisterType((*BlockHeader)(nil), "pb.BlockHeader")
}

func init() { proto.RegisterFile("header.proto", fileDescriptor_6398613e36d6c2ce) }

var fileDescriptor_6398613e36d6c2ce = []byte{
	// 160 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0xc9, 0x48, 0x4d, 0x4c,
	0x49, 0x2d, 0xd2, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62, 0x2a, 0x48, 0x52, 0x9a, 0xc1, 0xc8,
	0xc5, 0xed, 0x94, 0x93, 0x9f, 0x9c, 0xed, 0x01, 0x96, 0x11, 0x92, 0xe1, 0xe2, 0x2c, 0xc9, 0xcc,
	0x4d, 0x2d, 0x2e, 0x49, 0xcc, 0x2d, 0x90, 0x60, 0x54, 0x60, 0xd4, 0xe0, 0x0c, 0x42, 0x08, 0x08,
	0x29, 0x72, 0xf1, 0x24, 0x81, 0x14, 0xc7, 0x67, 0xa4, 0x66, 0xa6, 0x67, 0x94, 0x48, 0x30, 0x29,
	0x30, 0x6a, 0xb0, 0x04, 0x71, 0x27, 0x41, 0x0c, 0x00, 0x09, 0x09, 0xc9, 0x73, 0x71, 0xe7, 0xa6,
	0x16, 0x65, 0xe7, 0xa4, 0xc6, 0x17, 0xe5, 0xe7, 0x97, 0x48, 0x30, 0x83, 0x8d, 0xe0, 0x82, 0x08,
	0x05, 0xe5, 0xe7, 0x97, 0x08, 0xa9, 0x73, 0xf1, 0x17, 0x14, 0xa5, 0x96, 0x65, 0xe6, 0x97, 0x16,
	0xc7, 0x43, 0x9c, 0x23, 0xc1, 0x02, 0x56, 0xc4, 0x07, 0x13, 0x86, 0x38, 0x25, 0x89, 0x0d, 0xec,
	0x4a, 0x63, 0x40, 0x00, 0x00, 0x00, 0xff, 0xff, 0x4d, 0xb2, 0x1b, 0x58, 0xb5, 0x00, 0x00, 0x00,
}
